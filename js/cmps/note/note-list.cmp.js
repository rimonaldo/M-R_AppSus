import notePreview from '../../cmps/note/note-preview.cmp.js'

export default {
	props: ['notes'],
	template: `
    <section class="note-list">
        <ul>
            <li v-for="(note,idx) in notes" :key="note.id" class="note-preview-container">
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
	created() {},
	methods: {},
	computed: {},
	unmounted() {},
}
