import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile(): JwtPayload | null {
    // TODO: return the decoded token
    const token = this.getToken();
    if (token) {
      try {
      const decodedToken = jwtDecode<JwtPayload>(token);
      return decodedToken;
    } catch (err) {
      console.error('Error decoding token', err);
      return null;
    }
  }
  return null;
}

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    const token = this.getToken();
    return token;
  }
  
  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
    if (!token) {
      return true;
    }
    try {
      const decodedToken = jwtDecode<JwtPayload>(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return decodedToken.exp !== undefined && decodedToken.exp < currentTime;
    } catch (err) {
      console.error('Error decoding token for expiratioon check:', err);
      return true;
    }
  }

  getToken(): string {
    // TODO: return the token
    return localStorage.getItem('token') || '';
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    // TODO: redirect to the home page
    localStorage.setItem('token', idToken);
    window.location.assign('/');
  }

  logout() {
    // TODO: remove the token from localStorage
    // TODO: redirect to the login page
    localStorage.removeItem('token');
    window.location.assign('/login');
  }
}

export default new AuthService();
