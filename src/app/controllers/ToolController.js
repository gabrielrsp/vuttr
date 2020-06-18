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

    }

    else {
      const tool = await Tool.findAll({
        attributes: ['id', 'title', 'link', 'description', 'tags'],
      })
      return res.json(tool);
    }
  }

  async show(req, res) {

    const { id } = req.params;

    const tool = await Tool.findByPk(id, {
      attributes: ['id', 'title', 'link', 'description', 'tags'],
    })

    return res.json(tool)

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
    } else {
      return res.status(400).json({ error: 'tool not found' });
    }
  }

  async update(req, res) {
    const { id } = req.params
    const { title, link, description, tags } = req.body;

    let tool = await Tool.findByPk(id)

    await tool.update(req.body)

    tool = await tool.update(
      {
        title,
        link,
        description,
        tags
      },
      { where: { id } }
    );

    return res.status(200).json({
      title,
      link,
      description,
      tags,
      id: tool.id
    });
  }
}

export default new ToolController();
