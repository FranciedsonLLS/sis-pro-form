<template>
	<Form
		:validation-schema="schema"
		@submit="onSubmit"
		class="formulario-pesquisador formulario"
	>
		<div class="formulario__grupo">
			<CampoDeTexto
				id="nome-do-pesquisador"
				nome="nome-do-pesquisador"
				rotulo="Nome do(a) pesquisador(a) responsável"
				textoAuxiliar="Digite o nome do pesquisador"
			/>
		</div>

		<div class="formulario__grupo">
			<CampoDeCPF
				id="cpf-do-pesquisador"
				nome="cpf-do-pesquisador"
				rotulo="CPF"
				textoAuxiliar="Ex: 123.456.789-00"
			/>
			<CampoDeTelefone
				id="telefone-do-pesquisador"
				nome="telefone-do-pesquisador"
				rotulo="Telefone"
				textoAuxiliar="Ex: (11) 91234-5678"
			/>
		</div>

		<div class="formulario__grupo">
			<CampoDeTexto
				id="email-do-pesquisador"
				nome="email-do-pesquisador"
				rotulo="Email"
				textoAuxiliar="Ex: email@gmail.com"
			/>
		</div>

		<div class="formulario__grupo">
			<CampoDeTexto
				id="endereco-do-pesquisador"
				nome="endereco-do-pesquisador"
				rotulo="Endereço"
				textoAuxiliar="Ex: Rua dos Caiacós"
			/>
			<CampoDeNumero
				id="numero-do-endereco-do-pesquisador"
				nome="numero-do-endereco-do-pesquisador"
				rotulo="Número"
				textoAuxiliar="Ex: 404"
			/>
		</div>

		<div class="formulario__grupo">
			<CampoDeTexto
				id="cep-do-pesquisador"
				nome="cep-do-pesquisador"
				rotulo="CEP"
				textoAuxiliar="Ex: 12345678"
			/>
			<CampoDeTexto
				id="bairro-do-pesquisador"
				nome="bairro-do-pesquisador"
				rotulo="Bairro"
				textoAuxiliar="Ex: Centro"
			/>
		</div>

		<div class="formulario__grupo">
			<CampoDeEstadoCidade
				id="estado-e-cidade-do-pesquisador"
				nomeEstado="estado-do-pesquisador"
				nomeCidade="cidade-do-pesquisador"
			/>
		</div>

		<div class="formulariorodape">
			<Button class="formularioenviar" label="SALVAR" type="submit" />
		</div>
	</Form>
</template>

<script setup lang="ts">
import { Form } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

import CampoDeCPF from '@/components/Campos/CampoDeCPF/CampoDeCPF.vue'
import CampoDeEstadoCidade from '@/components/Campos/CampoDeEstadoCidade/CampoDeEstadoCidade.vue'
import CampoDeNumero from '@/components/Campos/CampoDeNumero/CampoDeNumero.vue'
import CampoDeTelefone from '@/components/Campos/CampoDeTelefone/CampoDeTelefone.vue'
import CampoDeTexto from '@/components/Campos/CampoDeTexto/CampoDeTexto.vue'
import Button from 'primevue/button'

import { usePesquisadoresResponsaveisStore } from '@/store/pesquisadoresResponsaveis'

const store = usePesquisadoresResponsaveisStore()


const zodSchema = z.object({
	'nome-do-pesquisador': z.string().min(1, 'Nome obrigatório'),
	'cpf-do-pesquisador': z.string().min(11, 'CPF inválido'),
	'telefone-do-pesquisador': z.string().min(14, 'Telefone inválido'),
	'email-do-pesquisador': z.string().email('Email inválido'),
	'endereco-do-pesquisador': z.string().min(5, 'Endereço inválido'),
	'numero-do-endereco-do-pesquisador': z.string().min(1, 'Número obrigatório'),
	'cep-do-pesquisador': z.string().min(8, 'CEP inválido'),
	'bairro-do-pesquisador': z.string().min(2, 'Bairro inválido'),
	'estado-do-pesquisador': z.any(),
	'cidade-do-pesquisador': z.any()
})

const schema = toTypedSchema(zodSchema)

type FormPesquisador = z.infer<typeof zodSchema>


function onSubmit(values: any, { resetForm }: any) {
	const v = values as FormPesquisador

	const novo = {
		id: Date.now(),
		nome: v['nome-do-pesquisador'],
		cpf: v['cpf-do-pesquisador'],
		email: v['email-do-pesquisador'],
		telefone: v['telefone-do-pesquisador'],
		endereco: v['endereco-do-pesquisador'],
		numero: v['numero-do-endereco-do-pesquisador'],
		cep: v['cep-do-pesquisador'],
		bairro: v['bairro-do-pesquisador'],
		estado: v['estado-do-pesquisador']?.sigla || v['estado-do-pesquisador'],
		cidade: v['cidade-do-pesquisador']?.label || v['cidade-do-pesquisador']
	}

	store.adicionarPesquisador(novo)

	console.log('Pesquisador adicionado:', novo)

	resetForm()
}
</script>

<style scoped lang="scss"></style>