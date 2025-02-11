import RoleResponse from '../responses/RoleResponse'
import WikiResponse from '../responses/WikiResponse'
import Role from './Role'
import TranslationContext from './translationContext'

export interface Context {
  rolesPath: string;
  iconsPath: string;
  translations: TranslationContext[];
  prevData?: Role[];
  data?: Partial<Role>[];
  stepName?: string;
  roles?: RoleResponse[];
  wiki?: WikiResponse[];
}