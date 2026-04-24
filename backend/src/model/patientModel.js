const supabase = require('../config/supabase')

const TABLE = 'patients'

async function findAll() {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

async function findById(id) {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw error
  return data
}

async function create({ name, email }) {
  const { data, error } = await supabase
    .from(TABLE)
    .insert([{ name, email }])
    .select()
    .single()
  if (error) throw error
  return data
}

async function update(id, { name, email }) {
  const { data, error } = await supabase
    .from(TABLE)
    .update({ name, email })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

async function remove(id) {
  const { error } = await supabase
    .from(TABLE)
    .delete()
    .eq('id', id)
  if (error) throw error
}

module.exports = { findAll, findById, create, update, remove }