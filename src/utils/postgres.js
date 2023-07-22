const mapRowToModel = (row) => {
  const createdAt = row.created_at
  const updatedAt = row.updated_at

  delete row.created_at
  delete row.updated_at

  return {
    ...row,
    createdAt,
    updatedAt
  }
}

module.exports = {
  mapRowToModel
}
