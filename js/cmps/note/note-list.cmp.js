import notePreview from '../../cmps/note/note-preview.cmp.js'

export default {
	props: ['notes'],
	template: `
    <section class="note-list">
        <ul>
            <li v-for="(note,idx) in notes" :key="note.id" class="note-preview-container">
            <component :is="cmp.type"  
                        :info="cmp.info" 
                        @setVal="setAns($event, idx)">
                    </component>
                <note-preview   :note="note"/>
            </li>
        </ul>
    </section>
`,

	components: {
		notePreview,
	},
	data() {
		return {}
	},
	created() {
		console.log(this.notes)
	},
	methods: {},
	computed: {},
	unmounted() {},
}
