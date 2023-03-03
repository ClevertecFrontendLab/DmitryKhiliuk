import {Outlet, useOutletContext} from 'react-router-dom';
import {useState} from "react";
import {RegistrationDataType} from "../../../common/types";

type ContextType = RegistrationDataType;

export const Registration = () => {
const x = () => {

}
    return (
        <div>
            <Outlet />
        </div>
    )
};


