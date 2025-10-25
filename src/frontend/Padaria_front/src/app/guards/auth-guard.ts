import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { UsuarioService } from '../../services/user/user';

export const authGuard: CanActivateFn = (route, state) => {
  const usuarioService = inject(UsuarioService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // No servidor, permite acesso (será verificado no cliente)
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  if (usuarioService.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree(['/login']);
};
