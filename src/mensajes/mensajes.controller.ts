import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { response } from 'express';
import { CreateMensajeDto } from './dto/create-mensaje-dto';
import { MensajesService } from './mensajes.service';


@Controller('mensajes')
export class MensajesController {

    constructor(private mensajesServices: MensajesService) { }

    @Post()
    create(@Body() createMensajeDto: CreateMensajeDto, @Res() response) {
        return this.mensajesServices.createMensaje(createMensajeDto).then(mensaje => {
            response.status(HttpStatus.CREATED).json(mensaje);
        }).catch(() =>
            response.status(HttpStatus.FORBIDDEN).json({ mensaje: 'Error al crear' })
        )
    }

    @Get()
    getAll(@Res() response) {
        return this.mensajesServices.getAll().then(mensajes => {
            response.status(HttpStatus.OK).json(mensajes);
        }).catch(() =>
            response.status(HttpStatus.FORBIDDEN).json({ mensaje: 'Error al obtener' })
        )
    }


    @Put(':id')
    update(@Body() updateMensajeDto: CreateMensajeDto, @Param('id') idMensaje) {
        this.mensajesServices.updateMensaje(idMensaje, updateMensajeDto).then((mensajeActualizado) => {
            response.status(HttpStatus.OK).json(mensajeActualizado);
        }).catch(() => {
            response.status(HttpStatus.FORBIDDEN).json({ mensaje: 'Error al editar' })
        })
    }

    @Delete(':id')
    delete(@Res() response, @Param('id') idMensaje) {
        this.mensajesServices.deleteMensaje(idMensaje).then(msj => {
            response.status(HttpStatus.OK).json(msj);
        }).catch(() => {
            response.status(HttpStatus.FORBIDDEN).json({ mensaje: 'Error al eliminar' })
        })
    }


}
