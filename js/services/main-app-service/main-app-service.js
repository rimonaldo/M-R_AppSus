export const appService = {
	remove,
	save,
	get,
	query,
}
// returns a promise
function query(key) {
	return storageService.query(key)
}

// remove item from model and storage
function remove(key, id) {
	return storageService.remove(key, id)
}

// returns a promise
function get(key, id) {
	return storageService.get(key, id)
}

// saves new item or updates existing item
function save(key, id) {
	if (note.id) return storageService.put(key, id)
	else return storageService.post(key, id)
}
