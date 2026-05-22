import db from '../data/database.js';
import { toCamelCase } from '../utils/format.js';

export default {
    async post(req, res, next) {
        const { body } = req;
        try {
            if (!body.name || !body.institution || !body.type) {
                throw new Error('Missing required fields: name, institution, type', 401);
            }

            if (!body.isAvailable && !body.isNeeded) {
                throw new Error('At least one of isAvailable or isNeeded must be true', 401);
            }

            if (isNaN(body.type) || isNaN(body.institution)) {
                throw new Error('Type and institution must be a valid id', 401);
            }

            const donationData = {
                name: body.name,
                institution: body.institution,
                type: body.type,
                subtype: body.subtype || null,
                description: body.description || null,
                is_needed: body.isNeeded || false,
                is_available: body.isAvailable || false,
                available_quantity: body.availableQuantity || null,
            }

            await db("donations")
                .insert(donationData);

            return res.status(200).json({
                status: "Success",
                message: "Doação criada com sucesso"
            });

        } catch (error) {
            return next(error);
        }
    },

    async getAll(req, res, next) {
        try {
            // Log para debug
            console.log('Filtros recebidos:', req.query);

            const { name, neighborhood, isNeeded, isAvailable, shift } = req.query;
            
            // Tratamento especial para o campo 'type' que pode vir como 'type' ou 'type[]'
            let type = req.query.type || req.query['type[]'];

            let query = db('donations as d')
                .join('institutions as i', 'd.institution', '=', 'i.id')
                .join('donation_types as dt', 'd.type', '=', 'dt.id')
                .select(
                    'd.*',
                    'i.name as institution_name',
                    'i.street',
                    'i.number',
                    'i.neighborhood',
                    'dt.type as type_name'
                )
                .distinct();

            if (shift && shift !== 'Adicionar turno') {
                query.join('institution_opening_days as op', 'i.id', '=', 'op.institution');
                
                if (shift === 'Manhã') {
                    query.where('op.opening_hours', '<', '12:00:00');
                } else if (shift === 'Tarde') {
                    query.where('op.opening_hours', '>=', '12:00:00')
                         .andWhere('op.opening_hours', '<', '18:00:00');
                } else if (shift === 'Noite') {
                    query.where('op.opening_hours', '>=', '18:00:00');
                }
            }

            if (name) {
                query.where('d.name', 'like', `%${name}%`);
            }
            if (neighborhood && neighborhood !== 'Adicionar bairro') {
                query.where('i.neighborhood', neighborhood);
            }
            if (type) {
                const typeList = Array.isArray(type) ? type : [type];
                query.whereIn('dt.type', typeList);
            }
            if (isNeeded === 'true') {
                query.where('d.is_needed', true);
            }
            if (isAvailable === 'true') {
                query.where('d.is_available', true);
            }

            let donations = await query;
            
            console.log(`Encontrados ${donations.length} itens.`);

            donations = toCamelCase(donations);

            return res.status(200).json({
                status: true,
                data: donations
            })

        } catch (error) {
            console.error('Erro no filtro:', error);
            return next(error);
        }
    },

    async getDetailsById(req, res, next) {
        try {
            const { id } = req.params;

            const donation = await db('donations as d')
                .join('institutions as i', 'd.institution', '=', 'i.id')
                .join('donation_types as dt', 'd.type', '=', 'dt.id')
                .select(
                    'd.*',
                    'i.name as institution_name',
                    'i.street',
                    'i.number',
                    'i.neighborhood',
                    'i.city',
                    'i.state',
                    'dt.type as type_name'
                )
                .where('d.id', id)
                .first();

            if (!donation) {
                return res.status(404).json({ status: false, message: 'Item não encontrado.' });
            }

            let openingDays = await db('institution_opening_days')
                .where('institution', donation.institution)
                .select('*');
            
            donation.opening_days = toCamelCase(openingDays);

            return res.status(200).json({
                status: true,
                data: toCamelCase(donation)
            });

        } catch (error) {
            return next(error);
        }
    },

    async getByInstitution(req, res, next) {

        try {
            const { idInstitution } = req.params;

            let donations = await db('donations').select("*").where('institution', idInstitution);

            donations = toCamelCase(donations);

            return res.status(200).json({
                status: true,
                data: donations
            })

        } catch (error) {
            return next(error);
        }
    },

    async getById(req, res, next) {

        try {
            const { idInstitution } = req.params;
            const { id } = req.params;

            let donations = await db('donations').select("*").where('id', id).andWhere('institution', idInstitution);

            donations = toCamelCase(donations);

            return res.status(200).json({
                status: true,
                data: donations
            })

        } catch (error) {
            return next(error);
        }
    },
    async put(req, res, next) {
        try {
            const { idInstitution } = req.params;
            const { id } = req.params;
            const data = req.body;

            await db('donations').where('id', id).andWhere('institution', idInstitution).update(data);

            return res.status(200).json({
                status: true,
                messege: "Doação atualizada com sucesso."
            })


        } catch (error) {
            console.log(error);
            return next(error);

        }
    },
    async delete(req, res, next) {
        try {
            const { idInstitution } = req.params;
            const { id } = req.params;

            await db('donations').where('id', id).andWhere('institution', idInstitution).del();

            return res.status(200).json({
                status: true,
                messege: 'Doação deletada com sucesso.'
            })

        } catch (error) {
            return next(error)
        }

    },
}
