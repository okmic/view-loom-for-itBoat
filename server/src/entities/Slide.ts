import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Slide {
  @Property()
  createdAt: Date = new Date()

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date()
  
  @PrimaryKey()
  id!: number

  @Property()
  name!: string

  @Property()
  description!: string
}