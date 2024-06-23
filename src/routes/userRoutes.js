const express = require("express")
const router = express.Router()
const userControllers = require("../controllers/userControllers")
const {validateBodyUser} = require("./validate")

/**
 * @swagger
 * /api/register:
 *    post:
 *      summary: Регистрация пользователя
 *      description: 
 *      tags:
 *        - Users
 *      requestBody:
 *        $ref: "#/components/requestBodies/Users"
 *      responses:
 *        200:
 *          description: Пользователь успешно зарегистрирован!
 *        400:
 *          description: Пользователь с таким email уже существует!
 *        500:
 *          description: Ошибка регистрации пользователя!   
 * components:
 *   requestBodies:
 *     Users:
 *       description: Обязательные поля тела запроса.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: email@gmail.com
 *                 description: E-mail пользователя
 *               password:
 *                 type: string
 *                 example: qwerty123
 *                 description: Пароль для входа(от 6 символов)
 */
router.post("/register",validateBodyUser, userControllers.register)

/**
 * @swagger
 * /api/login:
 *    post:
 *      summary: Вход в приложение
 *      description: 
 *      tags:
 *        - Users
 *      requestBody:
 *        $ref: "#/components/requestBodies/Users"
 *      responses:
 *        200:
 *          description: Пользователь выполнил вход в приложение
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *        401:
 *          description: Неверный email или пароль!
 *        500:
 *          description: Ошибка входа в систему   
 * components:
 *   requestBodies:
 *     Users:
 *       description: Обязательные поля тела запроса.
 *       required: true
 */
router.post("/login",validateBodyUser, userControllers.login)
module.exports = router