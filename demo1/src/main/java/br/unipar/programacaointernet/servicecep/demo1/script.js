document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://b3c5-177-91-39-198.ngrok-free.app/api/user';

    async function fetchUserData() {
        try {
            const response = await fetch(apiUrl, {
                headers: {
                    'ngrok-skip-browser-warning': 'true'
                }
            });

            if (!response.ok) {
                throw new Error('A resposta da rede não foi ok');
            }

            const data = await response.json();

            document.getElementById('nome').textContent = data.nome || 'Não disponível';
            document.getElementById('idade').textContent = data.idade || 'Não disponível';
            document.getElementById('sobreMim').textContent = data.sobreMim || 'Não disponível';
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    }

    fetchUserData();
});