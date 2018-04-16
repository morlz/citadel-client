<template>
<q-item class="Transaction">
	<q-item-side class="Transaction__time">
		<q-item-tile>
			{{ content.created_at }}
		</q-item-tile>
		<q-item-tile>
			{{ content.created_at }}
		</q-item-tile>

	</q-item-side>

	<q-item-main class="Transaction__description" :label="content.description"/>

	<q-item-side class="Transaction__amount" right icon="add">
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

</style>
