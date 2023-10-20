import {
  Injectable,
  HttpException,
  HttpStatus,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { TextChannel } from '../entity/textChannel';
import { channel } from 'diagnostics_channel';
import { Msg } from '../entity/Msg.entity';



const temporary = 30 * 60 * 1000;

@Injectable()
export class TextChannelService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    @InjectRepository(TextChannel)
    private readonly textChannelRepository: Repository<TextChannel>,

    @InjectRepository(Msg)
    private readonly msgRepository: Repository<Msg>,

  ) {}

  async createChannel(
    namechannel: string,
    userId: number,
  ): Promise<TextChannel> {
    const admin = await this.userService.validateUser(userId);
    
    if (namechannel == undefined)
      throw new HttpException(
        'TextChannel name needs to be specified',
        HttpStatus.FORBIDDEN,
        );

    if (
      await this.textChannelRepository.findOne({
        where: { name: namechannel },
      })
    )
      throw new HttpException(
        'TextChannel already exists',
        HttpStatus.FORBIDDEN,
      );
    
    const currentChannel = this.textChannelRepository.create({
      name: namechannel,
      owner: admin,
      users: [admin],
      adminId: [admin],
    });

    //console.log(admin)
    console.log('hello petite sac')
    try {
      await this.textChannelRepository.save(currentChannel);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
    console.log(currentChannel)
    //console.log(currentChannel.users)
    return currentChannel;
  }

  async getChannelMe(
    channelName: string,
  ): Promise<TextChannel> {
    let channel = null;
    //console.log(channelId)
    if (channelName)
      channel = await this.textChannelRepository.findOne({
        where: { name: channelName },
      });
    if (!channel)
      throw new HttpException('TextChannel not found', HttpStatus.NOT_FOUND);
   // console.log(channel)
    return channel;
  }

  async getChannel(
    channelId: number,
    relations = [] as string[],
  ): Promise<TextChannel> {
    let channel = null;
    //console.log(channelId)
    if (channelId)
      channel = await this.textChannelRepository.findOne({
        where: { id: channelId },
      });
    if (!channel)
      throw new HttpException('TextChannel not found', HttpStatus.NOT_FOUND);
    //console.log(channel.name)
    //console.log('le channel name dans getchannel')
    //console.log(channel.users)
    //console.log('le channel user dans getChannel')
    //console.log(TextChannel.name)
    console.log(channel)
    return channel;
  }

  async getChannelByName(
    channelName: string,
  ): Promise<TextChannel> {
    let channel = null;
    if (channelName)
      channel = await this.textChannelRepository.findOne({
        where: {name: channelName}
      });
      if (!channel)
      throw new HttpException('TextChannel not found', HttpStatus.NOT_FOUND);
    console.log(channel.name)
    return channel;
  }

  async getChannelsForUser(userId: number): Promise<TextChannel[]> {
    const uncompleted: TextChannel[] = await this.textChannelRepository
      .createQueryBuilder('channel')
      .innerJoin('channel.users', 'user')
      .where('user.id = :userId', { userId })
      .getMany();

    const unresolved: Promise<TextChannel>[] = uncompleted.map((channel) =>
      this.getChannel(channel.id, [
				'users',
			]),
    );
    return await Promise.all(unresolved);
  }

  async deleteChannel(id: number, adminId: number): Promise<void> {
    const admin = await this.userService.validateUser(adminId);
    const channel = await this.getChannel(id, [
      'users',
    ]);

    if (channel.owner.id != admin.id) {
      throw new HttpException(
        'User isnt owner in channel',
        HttpStatus.FORBIDDEN,
      )};

    await this.msgRepository.remove(channel.msgs);
    await this.textChannelRepository.remove(channel);
  }

  async addUserToChannel(channel: TextChannel, userId: number, adminId: number): Promise<void> {
    const admin = await this.userService.validateUser(adminId);
    const user = await this.userService.validateUser(userId);
    const curchannel = await this.getChannel(
      channel.id, [
				'users',
			]
    );

    if (!(curchannel.adminId.find((admin1) => admin1.id == admin.id))) {
      throw new HttpException(
        'User isnt admin in channel',
        HttpStatus.FORBIDDEN,
      )};

    if (curchannel.users.find((user1) => user1.id == user.id))
      throw new HttpException('User already in channel', HttpStatus.CONFLICT);
    
    await this.textChannelRepository
      .createQueryBuilder()
      .relation(TextChannel, 'users')
      .of(curchannel)
      .add(user);
  }

  async getAllChannels(): Promise<TextChannel[]> {
    const channels = await this.textChannelRepository.find();
    //channels
    return channels;
  }

  async removeUserFromChannel(
    channel: TextChannel,
    userId: number,
    adminId: number,
  ): Promise<void> {
    const admin = await this.userService.validateUser(adminId);
    const user = await this.userService.validateUser(userId);
    const curchannel = await this.getChannel(channel.id, [
      'users',
    ]);

    if (user.id == curchannel.owner.id)
      throw new HttpException('Cannot kick an owner', HttpStatus.FORBIDDEN);

    if (!(curchannel.adminId.find((admin1) => admin1.id == admin.id))) {
      throw new HttpException(
        'User isnt admin in channel',
        HttpStatus.FORBIDDEN,
      )};

    const index = curchannel.users.findIndex((user1) => user1.id == user.id);
    if (index == -1)
      throw new HttpException('User not in channel', HttpStatus.NOT_FOUND);
    curchannel.users.splice(index, 1);
    
    try {
      await this.textChannelRepository.save(curchannel);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
    console.log(curchannel);
  }

  async addAdmin(
    channel: TextChannel,
    userId: number,
    adminId: number,
  ): Promise<void> {
    const admin = await this.userService.validateUser(adminId);
    const user = await this.userService.validateUser(userId);
    const curchannel = await this.getChannel(channel.id, [
      'users',
    ]);

    if (!(curchannel.adminId.find((admin1) => admin1.id == admin.id))) {
      throw new HttpException(
        'User isnt admin in channel',
        HttpStatus.FORBIDDEN,
      )};

    if (curchannel.adminId.find((admin1) => admin1.id == user.id))
      throw new HttpException('User already in admin', HttpStatus.CONFLICT);

    const index = curchannel.users.findIndex((user1) => user1.id == user.id);
    if (index == -1)
      throw new HttpException('User not in channel', HttpStatus.NOT_FOUND);

    await this.textChannelRepository
      .createQueryBuilder()
      .relation(TextChannel, 'adminId')
      .of(curchannel)
      .add(user.id);
  }

  async removeAdmin(
    channel: TextChannel,
    userId: number,
    adminId: number,
  ): Promise<void> {
    const admin = await this.userService.validateUser(adminId);
    const user = await this.userService.validateUser(userId);
    const curchannel = await this.getChannel(channel.id, [
      'users',
    ]);

    if (!(curchannel.adminId.find((admin1) => admin1.id == admin.id))) {
      throw new HttpException(
        'User isnt admin in channel',
        HttpStatus.FORBIDDEN,
      )};

    if (curchannel.owner.id == user.id)
      throw new HttpException('User is a owner, owner is a god', HttpStatus.CONFLICT);

    const index = curchannel.adminId.findIndex((user1) => user1.id == user.id);
    if (index == -1)
      throw new HttpException('User is not in a admin groupe in this channel', HttpStatus.NOT_FOUND);
    curchannel.adminId.splice(index, 1);
    
    try {
      await this.textChannelRepository.save(curchannel);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
    console.log(curchannel);
  }

  async addMsgForChannel(
    message: string,
    channel_name: string,
    userId: number,
  ): Promise<void> {
      const channel = await this.getChannelMe(channel_name);
      const user = await this.userService.validateUser(userId);

      const msg = this.msgRepository.create({
        message: message,
        username: user.username,
      });

      try {
        await this.msgRepository.save(msg);
        await this.textChannelRepository
          .createQueryBuilder()
          .relation(TextChannel, 'msgs')
          .of(channel)
          .add(msg);
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      console.log("l'actuelle channel ou il y a le message", channel)
  }
}