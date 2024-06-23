const express = require("express")
const router = express.Router()
const tasksControllers = require("../controllers/tasksControllers")
const {validateId, validateBodyTask} = require("./validate")


/**
 * @swagger
 * /api/todos/:
 *   get:
 *     summary: Получить список задач пользователя
 *     description: Получение списка задач из базы данных 
 *     tags:
 *       - Todos
 *     security:
 *       - bearerAuth: [] 
 *     responses:
 *       401:
 *         description: Пользователь не авторизован!
 *       500:
 *          description: Внутренняя ошибка сервера. Пожалуйста, попробуйте повторить запрос позже.
 *       200:
 *         description: Массив тасок
 *         content:
 *           application/json:
 *             schema: 
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task' 
 *       
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         idUser:
 *           type: string
 *         title:
 *           type: string
 *         isCompleted:
 *           type: boolean
 */
router.get("/", tasksControllers.getTasks)

/**
 * @swagger
 * /api/todos:
 *    post:
 *      summary: Создать новую задачу
 *      description: 
 *      tags:
 *        - Todos
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *        $ref: "#/components/requestBodies/Todos"
 *      responses:
 *        200:
 *          description: Задача добавлена!
 *        500:
 *          description: Внутренняя ошибка сервера. Пожалуйста, попробуйте повторить запрос позже.
 *        401:
 *         description: Пользователь не авторизован!
 * components:
 *   requestBodies:
 *     Todos:
 *       description: Обязательные поля для создания задачи.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Закрыть 3-й чек-лист
 *                 description: Название задача
 *               isCompleted:
 *                 type: boolean
 *                 example: false
 *                 description: Выполнена ли задача
 */
router.post("/",validateBodyTask, tasksControllers.createTask)

/**
 * @swagger
 * /api/todos/{id}:
 *   patch:
 *     summary: Обнавление задачи
 *     description: Обновляет данные задачи по ее ID.
 *     tags:
 *        - Todos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID задачи
 *     security:
 *       - bearerAuth: []    
 *     requestBody:
 *        $ref: "#/components/requestBodies/Todos"
 *     responses:
 *       200:
 *         description: Задача обнавлена!
 *       404:
 *         description: Задача с указанным идентификатором не найдена.
 *       500:
 *         description: Внутренняя ошибка сервера. Пожалуйста, попробуйте повторить запрос позже.
 *       401:
 *         description: Пользователь не авторизован!
 */
router.patch("/:id",validateId, tasksControllers.editTask)


/**
 * @swagger
 * /api/todos/{id}/isCompleted:
 *   patch:
 *     summary: Изменение статуса задачи
 *     description: Обновляет статус задачи по ее ID.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *        - Todos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID задачи
 *     responses:
 *       200:
 *         description: Задача обнавлена!
 *       404:
 *         description: Задача с указанным идентификатором не найдена.
 *       500:
 *         description: Внутренняя ошибка сервера. Пожалуйста, попробуйте повторить запрос позже.
 *       401:
 *         description: Пользователь не авторизован!
 */
router.patch("/:id/isCompleted",validateId, tasksControllers.editTaskStatus)

/**
 * @swagger
 * /api/todos/{id}:
 *    delete:
 *      summary: Удалить задачу
 *      description:
 *      security:
 *       - bearerAuth: [] 
 *      tags:
 *        - Todos
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Задача удалена!
 *        404:
 *          description: Задача с указанным идентификатором не найдена.
 *        500:
 *          description: Внутренняя ошибка сервера. Пожалуйста, попробуйте повторить запрос позже.
 *        401:
 *         description: Пользователь не авторизован!
 */
router.delete("/:id",validateId,  tasksControllers.deleteTask)

module.exports = router