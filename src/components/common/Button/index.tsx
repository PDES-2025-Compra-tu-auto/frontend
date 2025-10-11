import type { ButtonProps } from "@mui/material"
import { StyledButton } from "./styles"
import type { FC } from "react"

type CtaButtonProps = ButtonProps & {withBackground?:boolean}

export const Button:FC<CtaButtonProps> =({...buttonProps})=><StyledButton {...buttonProps}/>