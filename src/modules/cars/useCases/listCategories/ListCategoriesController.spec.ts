import { Connection, createConnection } from "typeorm"
import { v4 as uuidV4 } from "uuid"
import request from 'supertest'
import { app } from "../../../../shared/infra/http/app"
import { hash } from "bcrypt"

let connection: Connection

describe("Create Category Controller", () => {
  beforeAll( async () => {
    connection = await createConnection()
    await connection.runMigrations()

    const id = uuidV4()
    const password = await hash('admin', 8)

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
      values('${id}', 'admin', 'admin@rentapp@.com', '${password}', true, 'now', 'XXXXXX')`
    )
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })

  it("Should be able to list all categories", async () => {
    const responseToken = await request(app)
      .post('/sessions')
      .send({
        email: "admin@rentapp@.com",
        password: "admin"
      })

    const {token} = responseToken.body

    await request(app)
      .post('/categories')
      .send({
        name: "SUV",
        description: "Big fat cars, they're kinda cool"
      })
      .set({
        Authorization: `Bearer ${token}`
      })

    const response = await request(app)
      .get('/categories')
      .set({
        Authorization: `Bearer ${token}`
      })

    expect(response.status).toBe(200)
    expect(response.body.length).toBeGreaterThanOrEqual(1)
    expect(response.body[0]).toHaveProperty('id')
  })
})