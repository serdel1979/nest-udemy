import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMensajeDto } from './dto/create-mensaje-dto';
import { Mensaje } from './entities/mensaje.entity';

@Injectable()
export class MensajesService {

    constructor(
        @InjectRepository(Mensaje)
        private mensajeRepository: Repository<Mensaje>,
    ) { }




    async getAll(): Promise<Mensaje[]> {
        return await this.mensajeRepository.find();
    }

    async createMensaje(mensajeNuevo: CreateMensajeDto): Promise<Mensaje>{
        const nuevo = new Mensaje()
        nuevo.mensaje = mensajeNuevo.mensaje;
        nuevo.nick = mensajeNuevo.nick;
        return this.mensajeRepository.save(nuevo);
    }

    async updateMensaje(id: number, mensajeNuevo: CreateMensajeDto): Promise<Mensaje>{
        const mensajeUpdate = await this.mensajeRepository.findOne({
            where: { id: id },
        });
        mensajeUpdate.mensaje = mensajeNuevo.mensaje;
        mensajeUpdate.nick = mensajeNuevo.nick;
        return await this.mensajeRepository.save(mensajeUpdate);
    }



    async deleteMensaje(id: number): Promise<any>{
       return await this.mensajeRepository.delete(id);
    }

}
