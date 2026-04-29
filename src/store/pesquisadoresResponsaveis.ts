import { defineStore } from 'pinia'
import dadosMock from '@/database/entidades/pesquisadoresResponsaveis.json'


type Pesquisador = {
	id: number
	nome: string
	cpf: string
	email: string
	telefone: string
	endereco: string
	numero: string
	cep: string
	bairro: string
	estado: string
	cidade: string
}

export const usePesquisadoresResponsaveisStore = defineStore('pesquisadoresResponsaveis', {
	state: () => ({
		
		pesquisadoresResponsaveis: JSON.parse(
			localStorage.getItem('pesquisadores') ||
			JSON.stringify(dadosMock)
		) as Pesquisador[]
	}),

	actions: {
		
		adicionarPesquisador(pesquisador: Pesquisador) {
			this.pesquisadoresResponsaveis.push(pesquisador)

			localStorage.setItem(
				'pesquisadores',
				JSON.stringify(this.pesquisadoresResponsaveis)
			)
		},

		
		excluirPesquisador(id: number) {
			this.pesquisadoresResponsaveis =
				this.pesquisadoresResponsaveis.filter(p => p.id !== id)
			console.log('clicou em excluir', id)
			localStorage.setItem(
				'pesquisadores',
				JSON.stringify(this.pesquisadoresResponsaveis)
			)
		}
	}
})