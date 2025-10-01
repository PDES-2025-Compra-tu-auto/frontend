import type { ButtonProps } from "@mui/material"
import { StyledButton } from "./styles"
import type { FC } from "react"



export const Button:FC<ButtonProps> =({...buttonProps})=><StyledButton {...buttonProps}/>