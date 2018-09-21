let users = [
    {id: 1, name:'Alice'},
    {id: 2, name:'Beck'},
    {id: 3, name:'Chris'}
]

const index = (req, res) => {
    req.query.limit = req.query.limit || 10
    const limit = parseInt(req.query.limit, 10)
  
    if(Number.isNaN(limit)) {
      res.status(400).end()
    } else {
      res.json(users.slice(0, limit))
    }
}

const show = (req, res) => {
    // id 값을 얻어낸다.
    const id = parseInt(req.params.id, 10)
    if(Number.isNaN(id)){
      return res.status(400).end()
    }
    // users 배열 조회
    const user = users.filter(user => user.id == id)[0]
    if(!user){
      return res.status(404).end()  
    }
    // 응답:res
    res.json(user)
}

const destory = (req, res) => {
    // id 값을 얻어낸다.
    const id = parseInt(req.params.id, 10)
    if(Number.isNaN(id)){
      return res.status(400).end()
    }
    // 삭제
    users = users.filter(user => user.id !== id)
    users.splice(id, 1)
    // 응답
    res.status(204).end()
}

const create = (req, res) => {
    const name = req.body.name
    // 내용이 없으면
    if(!name){
        return res.status(400).end()
    }
    // 중복
    const found = users.filter(user => user.name === name).length
    if(found){
        return res.status(409).end()
    }

    const id = Date.now()
    const user = {id, name}
    users.push(user)
    res.status(201).json(user)
}

module.exports = {
  index,
  show,
  destory,
  create
}