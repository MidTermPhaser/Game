def min(array) :
    if len(array) == 0:
        return None 
    else:
        k = array[0]
        for i in range(len(array)):
            if k >= array[i]:
                k = array[i]
    return k
            