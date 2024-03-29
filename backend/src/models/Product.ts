import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  name: string

  @Column("decimal", { precision: 10, scale: 2 })
  price: number

  @Column()
  path: string
}

export default Product