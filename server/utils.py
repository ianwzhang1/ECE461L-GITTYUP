def data_missing(keys: tuple, data):
    return [x for x in keys if x not in data]
