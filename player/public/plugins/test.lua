local function create(payload)
  print('Create called from inside lua, with payload:', payload['payload'])
end

registerEvent('system:create', create)

triggerEvent('user:custom', 123)