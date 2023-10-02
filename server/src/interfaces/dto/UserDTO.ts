export interface IUserRequestDTO {
  username: string
  password: string
}
export interface IUserRegisterRequestDTO extends IUserRequestDTO {
  confirmPassword: string
}
