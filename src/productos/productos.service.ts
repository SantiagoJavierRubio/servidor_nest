import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Producto, ProductoDocument } from './productos.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductosService {
  constructor(
    @InjectModel(Producto.name) private productoModel: Model<ProductoDocument>,
  ) {}
  async create(producto: Producto): Promise<Producto> {
    const nuevoProducto = new this.productoModel(producto);
    return await nuevoProducto.save();
  }
  async getAll(): Promise<Producto[]> {
    return await this.productoModel.find().exec();
  }
  async getById(id: string): Promise<Producto> {
    return await this.productoModel.findById(id).exec();
  }
  async update(id: string, data: Producto): Promise<Producto> {
    return await this.productoModel.findByIdAndUpdate(id, data).exec();
  }
  async delete(id: string): Promise<Producto[]> {
    await this.productoModel.findByIdAndRemove(id).exec();
    return await this.productoModel.find().exec();
  }
}
