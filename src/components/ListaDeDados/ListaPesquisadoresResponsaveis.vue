<template>
	<div class="lista-de-dados">
		<div
			class="lista-de-dados__pesquisador"
			v-for="pesquisadorResponsavel in dados"
			:key="pesquisadorResponsavel.id"
		>
			<div class="lista-de-dados__dados">
				<Dado
					nome="Nome completo do pesquisador responsável"
					:valor="pesquisadorResponsavel.nome"
				/>
				<Dado nome="CPF" :valor="pesquisadorResponsavel.cpf" />
				<Dado nome="E-mail" :valor="pesquisadorResponsavel.email" />
				<Dado nome="Telefone" :valor="pesquisadorResponsavel.telefone" />
				<Dado nome="Endereço" :valor="pesquisadorResponsavel.endereco" />
				<Dado nome="Número" :valor="pesquisadorResponsavel.numero" />
				<Dado nome="CEP" :valor="pesquisadorResponsavel.cep" />
				<Dado nome="Bairro" :valor="pesquisadorResponsavel.bairro" />
				<Dado nome="Estado" :valor="pesquisadorResponsavel.estado" />
				<Dado nome="Cidade" :valor="pesquisadorResponsavel.cidade" />
			</div>

			<div class="lista-de-dados__rodape">
				<Button
					severity="warning"
					icon="pi pi-pencil"
					class="lista-de-dados__botao-editar"
				/>

				<Button
					severity="danger"
					icon="pi pi-trash"
					class="lista-de-dados__botao-excluir"
					@click="excluir(pesquisadorResponsavel.id)"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import Dado from './Dado.vue'
//import { defineProps } from 'vue'
import { usePesquisadoresResponsaveisStore } from '@/store/pesquisadoresResponsaveis'


const store = usePesquisadoresResponsaveisStore()


interface Pesquisador {
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


defineProps<{ dados: Pesquisador[] }>()


function excluir(id: number) {
	store.excluirPesquisador(id)
}
</script>

<style scoped lang="scss">
.lista-de-dados {
	display: flex;
	flex-direction: column;
	gap: var(--g-16);

	&__dados {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
	}

	&__rodape {
		display: flex;
		justify-content: flex-end;
		background-color: var(--light);
		border: 1px solid var(--gray-300);
		gap: var(--g-8);
		padding: var(--p-16);
	}
}
</style>