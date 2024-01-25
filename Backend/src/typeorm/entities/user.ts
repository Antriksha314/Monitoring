import { BeforeInsert, Column, Entity } from "typeorm";
import Base from "./base";
import bcrypt from "bcrypt";
import { StatusEnum } from "../../utils/enums";

@Entity()
export class User extends Base {
  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  email: string

  @Column({ default: 'user' })
  role: string

  @Column({nullable: true})
  password: string

  @Column({nullable: true})
  phone: string

  @Column({ type: 'enum', enum: StatusEnum, default: StatusEnum.PENDING })
  status: string

  // @BeforeInsert()
  // async hashPassword(): Promise<void> {
  //   if (this.password) {
  //     this.password = await bcrypt.hash(this.password, 10);
  //   }
  // }
}