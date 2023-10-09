import { Language, Role } from '../../entities/User'

export interface IUserLoginDTO {
  userId: string
  email: string
}
export interface IUserRegisterDTO {
  userId: string
  email: string
  role: string
  nativeLanguage: string
  avatar: string
  fullName: string
  displayName: string
}
export interface IUserUpdateDTO {
  avatar?: string
  fullName?: string
  displayName?: string
  role?: Role
  nativeLanguage?: Language
}
