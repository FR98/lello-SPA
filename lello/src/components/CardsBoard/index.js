import React, { Fragment } from 'react';

import './styles.css'; 

import {
    GeneralBtn,
    SuccessBtn,
    DangerBtn,
} from '../Buttons';

const CardsBoard = () => (
    <div className='cards-board'>
        <GeneralBtn text="Configuracion" />
        <SuccessBtn text="Crear" />
        <DangerBtn text="Borrar" />
        <GeneralBtn text="Configuracion" />
        <SuccessBtn text="Crear" />
        <DangerBtn text="Borrar" />
        <GeneralBtn text="Configuracion" />
        <SuccessBtn text="Crear" />
        <DangerBtn text="Borrar" />
        <GeneralBtn text="Configuracion" />
        <SuccessBtn text="Crear" />
        <DangerBtn text="Borrar" />
        <GeneralBtn text="Configuracion" />
        <SuccessBtn text="Crear" />
        <DangerBtn text="Borrar" />
        <GeneralBtn text="Configuracion" />
        <SuccessBtn text="Crear" />
        <DangerBtn text="Borrar" />
    </div>
);

export default CardsBoard;
