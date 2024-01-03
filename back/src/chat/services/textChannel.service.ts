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
import { Msg } from '../entity/Msg.entity';
import * as bcrypt from 'bcrypt';
import { UserDto } from 'src/user/dtos/UserDto';
import { MutedUser } from '../entity/muet.entity';
import { BannedUser } from '../entity/banned.entity';



const temporary = 3 * 60 * 1000;

@Injectable()
export class TextChannelService {

  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    @InjectRepository(TextChannel)
    private readonly textChannelRepository: Repository<TextChannel>,

    @InjectRepository(Msg)
    private readonly msgRepository: Repository<Msg>,

    @InjectRepository(MutedUser)
    private readonly mutedUserRepository: Repository<MutedUser>,

    @InjectRepository(BannedUser)
    private readonly bannedUserRepository: Repository<BannedUser>,

  ) { }

  async createChannel(
    namechannel: string,
    userId: number,
    passWorld: string,
  ): Promise<TextChannel> {
    const admin = await this.userService.validateUser(userId);

    if (namechannel == undefined)
      throw new HttpException(
        'TextChannel name needs to be specified',
        HttpStatus.FORBIDDEN,
      );

    if (!namechannel)
      throw new HttpException(
        'The name of TextChannel needs to be specified',
        HttpStatus.FORBIDDEN,
      );

    if (namechannel === "")
      throw new HttpException(
        'The name of TextChannel needs to be specified',
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

    const cryptPassword = await bcrypt.hash(passWorld, 10);

    const currentChannel = this.textChannelRepository.create({
      name: namechannel,
      owner: admin,
      users: [admin],
      adminId: [admin],
      status: true,
      password: cryptPassword,
    });

    try {
      await this.textChannelRepository.save(currentChannel);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
    return currentChannel;
  }

  async getChannelMe(
    channelName: string,
  ): Promise<TextChannel> {
    let channel = null;
    if (channelName)
      channel = await this.textChannelRepository.findOne({
        where: { name: channelName },
      });
    if (!channel)
      throw new HttpException('TextChannel not found', HttpStatus.NOT_FOUND);
    return channel;
  }

  async getChannelMeForDM(
    channelName: string,
  ): Promise<number> {
    let channel = null;
    if (channelName)
      channel = await this.textChannelRepository.findOne({
        where: { name: channelName },
      });
    if (!channel)
      return 0;
    return 1;
  }

  async getChannel(
    channelId: number,
    relations = [] as string[],
  ): Promise<TextChannel> {
    let channel = null;
    if (channelId)
      channel = await this.textChannelRepository.findOne({
        where: { id: channelId },
      });
    if (!channel)
      throw new HttpException('TextChannel not found', HttpStatus.NOT_FOUND);
    return channel;
  }

  async getChannelByName(
    channelName: string,
  ): Promise<TextChannel> {
    let channel = null;
    if (channelName)
      channel = await this.textChannelRepository.findOne({
        where: { name: channelName }
      });
    if (!channel)
      throw new HttpException('TextChannel not found', HttpStatus.NOT_FOUND);
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
      )
    };

    await this.msgRepository.remove(channel.msgs);
    await this.mutedUserRepository.remove(channel.muted);
    await this.bannedUserRepository.remove(channel.banned);
    await this.textChannelRepository.remove(channel);
  }

  async addUserToChannel(channel: TextChannel, userId: number): Promise<void> {
    const user = await this.userService.validateUser(userId);
    const curchannel = await this.getChannel(
      channel.id, [
      'users',
    ]
    );
    /*
        if (!(curchannel.adminId.find((admin1) => admin1.id == admin.id))) {
          throw new HttpException(
            'User isnt admin in channel',
            HttpStatus.FORBIDDEN,
          )};
    */

    if (!curchannel.users.find((user1) => user1.id == user.id)) {
      // throw new HttpException('User already in channel', HttpStatus.CONFLICT);


      await this.textChannelRepository
        .createQueryBuilder()
        .relation(TextChannel, 'users')
        .of(curchannel)
        .add(user);
    }
  }

  async getAllChannels(): Promise<TextChannel[]> {
    const channels = await this.textChannelRepository.find();
    //channels

    return channels;
  }

  async removeUserFromChannel(
    channel: TextChannel,
    userId: number,
  ): Promise<void> {
    const user = await this.userService.validateUser(userId);
    const curchannel = await this.getChannel(channel.id, [
      'users',
    ]);
    /*
        if (user.id == curchannel.owner.id)
          throw new HttpException('Cannot kick an owner', HttpStatus.FORBIDDEN);
    
        if (!(curchannel.adminId.find((admin1) => admin1.id == admin.id))) {
          throw new HttpException(
            'User isnt admin in channel',
            HttpStatus.FORBIDDEN,
          )};
    */
    const index = curchannel.users.findIndex((user1) => user1.id == user.id);
    if (index != -1) {
      //   throw new HttpException('User not in channel', HttpStatus.NOT_FOUND);
      curchannel.users.splice(index, 1);

      try {
        await this.textChannelRepository.save(curchannel);
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    }
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
      )
    };

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
      )
    };

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
      userId: userId,
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
  }

  async changeStatue(
    channel: TextChannel,
    status: boolean,
  ): Promise<void> {
    await this.textChannelRepository.update(channel.id, { status })

    /* try {
       await this.textChannelRepository.save(channel);
     } catch (error) {
       throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
     }*/
  }

  /*async setPassword(
    channel: TextChannel,
    pass: string,
  ): Promise<number> {
    if (pass.length > 16) {
      throw new HttpException('New password too long', HttpStatus.FORBIDDEN);
    }

    if (!pass){
      return 1;
    //  throw new HttpException(
     //   'New password cannot be empty',
     //   HttpStatus.FORBIDDEN,
    //  );
    }

    try {
      const password = await bcrypt.hash(pass, 10);
      await this.textChannelRepository.update(channel.id, { password });
    } catch (error) {
        return 1;
     // throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
    return 0;
  }*/

  async checkPassWord(
    channel: TextChannel,
    pass: string,
  ): Promise<string> {
    if (!pass)
      return "ko";

    if ((await bcrypt.compare(pass, channel.password)) === true)
      return "ok";
    else
      return "ko";
  }

  async changePass(
    channel: TextChannel,
    oldPass: string,
    newPass: string,
  ): Promise<number> {
    if (newPass.length > 16) {
      throw new HttpException('New password too long', HttpStatus.FORBIDDEN);
    }

    if ((await bcrypt.compare(oldPass, channel.password)) === true) {
      if (!newPass) {
        return 0;
      }

      try {
        const password = await bcrypt.hash(newPass, 10);
        await this.textChannelRepository.update(channel.id, { password });
      } catch (error) {
        return 0;
      }
      return 1;
    }
    return 0;
  }

  async muteUserInChannel(
    channel: TextChannel,
    admin: UserDto,
    userMute: UserDto,
    Time: number,
  ) {
    if (channel.owner == userMute) {
      throw new HttpException(
        'User is owner and thus cannot be muted',
        HttpStatus.FORBIDDEN,
      );
    }

    if (userMute.id == channel.owner.id)
      throw new HttpException('Cannot muet an owner', HttpStatus.FORBIDDEN);

    if (!channel.users.find((user1) => user1.id == userMute.id))
      throw new HttpException('User isnt in channel', HttpStatus.NOT_FOUND);

    if (!channel.adminId.find((adminID) => adminID.id == admin.id))
      throw new HttpException(
        'User isnt admin in channel',
        HttpStatus.FORBIDDEN,
      );

    if (channel.muted.find((user1) => user1.id == userMute.id))
      throw new HttpException('User is already muted', HttpStatus.FORBIDDEN);

    const temp = Time * 60 * 1000;

    const time = new Date(Date.now() + temp);
    const muted = this.mutedUserRepository.create({
      endOfMute: time,
      userId: userMute.id,
      channel: channel.name,
    });

    try {
      await this.mutedUserRepository.save(muted);
      await this.textChannelRepository
        .createQueryBuilder()
        .relation(TextChannel, 'muted')
        .of(channel)
        .add(muted);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

  }

  async unMutedUser(
    channel: TextChannel,
    user: UserDto,
    index: number,
  ) {
    await this.mutedUserRepository.delete(channel.muted[index]);
  }

  async banUserInChannel(
    channel: TextChannel,
    admin: UserDto,
    userBan: UserDto,
    Time: number,
  ) {
    if (channel.owner == userBan) {
      throw new HttpException(
        'User is owner and thus cannot be muted',
        HttpStatus.FORBIDDEN,
      );
    }
    let isTime: number;
    if (Time >= 1) {
      isTime = Time;
    }
    else
      isTime = 52596000;

    if (userBan.id == channel.owner.id)
      throw new HttpException('Cannot kick an owner', HttpStatus.FORBIDDEN);

    if (!channel.users.find((user1) => user1.id == userBan.id))
      throw new HttpException('User isnt in channel', HttpStatus.NOT_FOUND);

    if (!channel.adminId.find((adminID) => adminID.id == admin.id))
      throw new HttpException(
        'User isnt admin in channel',
        HttpStatus.FORBIDDEN,
      );

    if (channel.banned.find((user1) => user1.id == userBan.id))
      throw new HttpException('User is already banned', HttpStatus.FORBIDDEN);

    const temp = isTime * 60 * 1000;

    const time = new Date(Date.now() + temp);
    const banned = this.bannedUserRepository.create({
      endOfBan: time,
      userId: userBan.id,
      channel: channel.name,
    });

    try {
      await this.bannedUserRepository.save(banned);
      await this.textChannelRepository
        .createQueryBuilder()
        .relation(TextChannel, 'banned')
        .of(channel)
        .add(banned);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async unBanUser(
    channel: TextChannel,
    user: UserDto,
    index: number,
  ) {
    await this.bannedUserRepository.delete(channel.banned[index]);
  }
}