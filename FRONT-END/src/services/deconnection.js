
export const deconnexion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}