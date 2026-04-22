<template>
	<div class="campo-de-cpf campo-container">
		<label class="campo-de-cpf__rotulo rotulo" :for="id">{{ rotulo }}</label>

		<Field :name="nome" v-slot="{ value, handleChange }">
			<InputMask
				:id="id"
				class="campo-de-cpf__campo campo"
				:mask="'999.999.999-99'"
				:placeholder="textoAuxiliar"
				:modelValue="value"
				@update:modelValue="handleChange"
			/>
		</Field>

		<ErrorMessage class="campo-mensagem-de-erro" :name="nome" />
	</div>
</template>

<script setup lang="ts">
import InputMask from 'primevue/inputmask'
import { Field, ErrorMessage } from 'vee-validate'

interface Props {
	id: string
	rotulo: string
	textoAuxiliar?: string
	nome: string
}

defineProps<Props>()
</script>