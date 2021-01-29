function hashFunction(key) {
  let prime = 16777619;
  let hash = 2166136261;

  for (let i = 0; i < key.length; i++) {
    hash = (hash ^ key.charCodeAt(i)) * prime;
  }

  return hash >>> 0;
}

class hashTable {
  table = new Array(10)
  size = 0;

  resize() {
    const newTable = new Array(this.table.length * 2);
    this.table.forEach(item => {
      if (item) {
        item.forEach(([key, value]) => {
          const index = hashFunction(key) % newTable.length
          if (newTable[index]) {
            newTable[index].push([key,value])
          } else {
            newTable[index] = [[key, value]]
          }
        })
      }
    })
    this.table = newTable;
  }

  setItem(key, value) {
    const loadFactor = this.size / this.table.length
    if (loadFactor > 0.6) {
      console.log("load Factor:", loadFactor)
      this.resize()
    }

    const index = hashFunction(key) % this.table.length
    if (this.table[index]) {
      this.table[index].push([key, value])
      ++this.size;
    } else {
      this.table[index] = [[key, value]]
      ++this.size;
    }
  }

  getItem(key) {
    const index = hashFunction(key) % this.table.length
    return this.table[index].find(i => i[0] === key)[1]
  }

  getStats() {
    console.log("items:", this.size)
    console.log("container:", this.table.length)
  }
}

const hash = new hashTable()

hash.setItem("a", "1")
hash.setItem("b", "2")
hash.setItem("c", "3")
hash.setItem("d", "4")
hash.setItem("e", "5")
hash.setItem("f", "6")
hash.setItem("g", "7")
hash.setItem("l", "8")
hash.getTable()
hash.getStats()