// origin methods
// methods: add、clear、delete、entries、forEach、has、keys、toJSON、values
// attribute: size

// https://www.w3schools.com/python/python_ref_set.asp
class EnhanceSet extends Set {
  constructor(item) {
    super(item)
  }

  from() {
    return Array.from(this)
  }

  reverse() {
    return new Set(this.from().reverse())
  }

  remove(item) {
    super.delete(item)
    return this
  }

  pop() {
    const [item] = this.reverse()
    super.delete(item)
    return item
  }

  shift() {
    const [item] = this
    super.delete(item)
    return item
  }

  copy() {
    return new Set(this.from())
  }

  union(target) {
    return new Set([...this, ...target])
  }

  update(target) {
    for (const item of target) {
      this.add(item)
    }
    return this
  }

  isdisjoint(target) {
    return target.size + this.size === this.union(target).size
  }

  issubset(target) {
    return Array.from(this).every((item) => target.has(item))
  }

  issuperset(target) {
    return Array.from(target).every((item) => this.has(item))
  }
}

export default EnhanceSet
