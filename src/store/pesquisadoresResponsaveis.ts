import { defineStore } from 'pinia'
import dadosMock from '@/database/entidades/pesquisadoresResponsaveis.json'

export const usePesquisadoresResponsaveisStore = defineStore('pesquisadoresResponsaveis', {
	state: () => ({
		pesquisadoresResponsaveis: JSON.parse(
			localStorage.getItem('pesquisadores') ||
			JSON.stringify(dadosMock)
		)
	}),

	actions: {
		adicionarPesquisador(pesquisador: any) {
			this.pesquisadoresResponsaveis.push(pesquisador)

			// 🔥 SALVA NO NAVEGADOR
			localStorage.setItem(
				'pesquisadores',
				JSON.stringify(this.pesquisadoresResponsaveis)
			)
		}
	}
})