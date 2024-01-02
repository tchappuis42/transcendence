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
import { DMChannel } from '../entity/dmChannel.entity';
import { Msg } from '../entity/Msg.entity';
import { UserDto } from 'src/user/dtos/UserDto';


@Injectable()
export class DMChannelService {

  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    @InjectRepository(DMChannel)
    private readonly dmChannelRepository: Repository<DMChannel>,

    @InjectRepository(Msg)
    private readonly msgRepository: Repository<Msg>,

  ) { }

  async createDMChannel(
    user: UserDto,
    user2: UserDto
  ): Promise<DMChannel> {
    const name = user.id + "_" + user2.id + "immondeFDPdeDMdeROOM";
    if (
      await this.dmChannelRepository.findOne({
        where: { name: name },
      })
    )
      throw new HttpException(
        'DMChannel already exists',
        HttpStatus.FORBIDDEN,
      );

    const DMChannel = this.dmChannelRepository.create({
      name: name,
      users: [user, user2],
      user1: [user],
      user2: [user2],
      block1: false,
      block2: false,
    });

    try {
      await this.dmChannelRepository.save(DMChannel);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
    return DMChannel;
  }

  async getChannel(
    channelId: number,
    relations = [] as string[],
  ): Promise<DMChannel> {
    let channel = null;
    if (channelId)
      channel = await this.dmChannelRepository.findOne({
        where: { id: channelId },
      });
    if (!channel)
      throw new HttpException('DMChannel not found', HttpStatus.NOT_FOUND);
    return channel;
  }

  async getDMChannelsForUser(
    userId: number
  ): Promise<DMChannel[]> {
    const uncompleted: DMChannel[] = await this.dmChannelRepository
      .createQueryBuilder('channel')
      .innerJoin('channel.users', 'user')
      .where('user.id = :userId', { userId })
      .getMany();

    const unresolved: Promise<DMChannel>[] = uncompleted.map((channel) =>
      this.getChannel(channel.id, [
        'users',
      ]),
    );
    return await Promise.all(unresolved);
  }

  async getDMChannelMe(
    channelName: string,
  ): Promise<DMChannel> {
    let channel = null;

    if (channelName)
      channel = await this.dmChannelRepository.findOne({
        where: { name: channelName },
      });
    if (!channel)
      throw new HttpException('DMChannel not found', HttpStatus.NOT_FOUND);

    return channel;
  }

  async getDMChannelMeForText(
    channelName: string,
  ): Promise<number> {
    let channel = null;

    if (channelName)
      channel = await this.dmChannelRepository.findOne({
        where: { name: channelName },
      });
    if (!channel)
      return 0;

    return 1;
  }

  async addMsgForDMChannel(
    message: string,
    channel_name: string,
    userId: number,
  ): Promise<void> {
    const channel = await this.getDMChannelMe(channel_name);
    const user = await this.userService.validateUser(userId);

    const msg = this.msgRepository.create({
      message: message,
      username: user.username,
      userId: userId,
    });

    try {
      await this.msgRepository.save(msg);
      await this.dmChannelRepository
        .createQueryBuilder()
        .relation(DMChannel, 'msgs')
        .of(channel)
        .add(msg);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async DMBlock(
    channel: DMChannel,
    user: UserDto,
    status: boolean,
  ) {
    if (channel.user1[0].id === user.id)
      await this.dmChannelRepository.update(channel.id, { block1: status })
    else
      await this.dmChannelRepository.update(channel.id, { block2: status })
  }

  async findDMBlock(
    channel: DMChannel,
    user: UserDto,
    blocked: number[],
  ) {
    if (channel.user1[0].id === user.id) {
      if (blocked) {
        if (blocked.find((users) => users == channel.user2[0].id))
          await this.DMBlock(channel, user, true);
        else
          await this.DMBlock(channel, user, false);
      }
      else if (channel.block1 === true)
        await this.DMBlock(channel, user, false);
    }
    else {
      if (blocked) {
        if (blocked.find((users) => users == channel.user1[0].id))
          await this.DMBlock(channel, user, true);
        else
          await this.DMBlock(channel, user, false);
      }
      else if (channel.block2 === true)
        await this.DMBlock(channel, user, false);
    }
  }
}