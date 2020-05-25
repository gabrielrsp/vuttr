import Tool from '../models/Tool';
import { Op } from 'sequelize';

class ToolController {

  async index(req, res) {

    if (req.query.tag) {
      const tag = req.query.tag;

      const tool = await Tool.findAll({
        attributes: ['id', 'title', 'link', 'description', 'tags'],
        where: {
          tags: {
            [Op.contains]: [tag]
          }
        }
      })
      return res.json(tool);

    } else {
      const tool = await Tool.findAll({
        attributes: ['id', 'title', 'link', 'description', 'tags'],
      })
      return res.json(tool);
    }
  }

  async store(req, res) {

    const { title, link, description, tags } = req.body;
    const tool = await Tool.create({
      title,
      link,
      description,
      tags
    });

    return res.status(201).json({
      title,
      link,
      description,
      tags,
      id: tool.id
    });
  }

  async delete(req, res) {

    const { id } = req.params
    const tool = await Tool.findOne({
      where: { id }
    });

    if (tool) {
      await Tool.destroy({
        where: { id }
      });

      return res.status(204).send()
    }
  }
}

export default new ToolController();
