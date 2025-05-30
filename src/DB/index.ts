import colors from 'colors';
import { User } from '../app/modules/user/user.model';
import config from '../config';
import { logger } from '../shared/logger';
import { TUser } from '../app/modules/user/user.interface';

const superUser: TUser = {
  name: 'Abdullah',
  role:"ADMIN",
  email: config.super_admin.email!,
  password: config.super_admin.password!,
  verified: true,
  address: 'N/A',
  phoneNumber: 'N/A',
  birthDate: new Date('2000-01-01'),
  status: 'active',
  levelOfSport: 'Professional',
  playerType: 'Pitcher',
  ThreeWordThtDescribeYou: 'Hardworking, Dedicated, Passionate',
  HowOftenDoYouJournal: 'Pretty consistent',
};

const seedSuperAdmin = async () => {
  const isExistSuperAdmin = await User.findOne({
    role: "ADMIN",
  });

  if (!isExistSuperAdmin) {
    await User.create(superUser);
    logger.info(colors.green('✔ Super admin created successfully!'));
  }
};

export default seedSuperAdmin;
