<template>
<q-item class="Transaction">
	<q-item-side class="Transaction__time">
		<q-item-tile>
			{{ content.dateText }}
		</q-item-tile>
		<q-item-tile>
			{{ content.timeText }}
		</q-item-tile>

	</q-item-side>

	<q-item-main class="Transaction__description" :label="content.description" :sublabel="content.textFromNow"/>

	<q-item-side class="Transaction__amount" right>
		{{ content.amount }}
	</q-item-side>
</q-item>
</template>

<script>
import {
	mapGetters,
	mapActions,
	MapMutations,
	mapState
} from 'vuex'

import { QItemTile } from 'quasar'

export default {
	components: {
		QItemTile
	},
	props: {
		content: Object
	}
}
</script>

<style lang="stylus">
.Transaction
	&__amount
		font-size 24px
</style>
