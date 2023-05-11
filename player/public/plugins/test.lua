local function create(payload)
  print('Create called from inside lua, with payload:', payload)
  return payload
end

registerEvent('system:create', create)

triggerEvent('user:custom', { payload = 123 })