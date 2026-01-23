/**
 * Rotas para gerenciamento de perfis
 */

import express from 'express';

const router = express.Router();

// Armazenamento em memória (em produção, usar banco de dados)
let profiles = [];

// GET - Listar todos os perfis
router.get('/', (req, res) => {
  res.json({
    success: true,
    count: profiles.length,
    data: profiles
  });
});

// GET - Obter perfil por ID
router.get('/:id', (req, res) => {
  const profile = profiles.find(p => p.id === req.params.id);

  if (!profile) {
    return res.status(404).json({
      success: false,
      error: 'Perfil não encontrado'
    });
  }

  res.json({
    success: true,
    data: profile
  });
});

// POST - Criar novo perfil
router.post('/', (req, res) => {
  const { name, avatar, ageGroup } = req.body;

  if (!name || !avatar || !ageGroup) {
    return res.status(400).json({
      success: false,
      error: 'Campos obrigatórios: name, avatar, ageGroup'
    });
  }

  const newProfile = {
    id: Date.now().toString(),
    name,
    avatar,
    ageGroup,
    createdAt: new Date().toISOString(),
    stats: {
      totalWords: 0,
      successRate: 0,
      playTime: 0,
      currentStreak: 0,
      stars: 0,
      level: 1,
      xp: 0
    }
  };

  profiles.push(newProfile);

  res.status(201).json({
    success: true,
    data: newProfile
  });
});

// PUT - Atualizar perfil
router.put('/:id', (req, res) => {
  const index = profiles.findIndex(p => p.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: 'Perfil não encontrado'
    });
  }

  profiles[index] = {
    ...profiles[index],
    ...req.body,
    updatedAt: new Date().toISOString()
  };

  res.json({
    success: true,
    data: profiles[index]
  });
});

// DELETE - Deletar perfil
router.delete('/:id', (req, res) => {
  const index = profiles.findIndex(p => p.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: 'Perfil não encontrado'
    });
  }

  profiles.splice(index, 1);

  res.json({
    success: true,
    message: 'Perfil deletado com sucesso'
  });
});

// POST - Sincronizar perfis do cliente
router.post('/sync', (req, res) => {
  const { profiles: clientProfiles } = req.body;

  if (!Array.isArray(clientProfiles)) {
    return res.status(400).json({
      success: false,
      error: 'profiles deve ser um array'
    });
  }

  // Merge com perfis existentes
  clientProfiles.forEach(clientProfile => {
    const existingIndex = profiles.findIndex(p => p.id === clientProfile.id);

    if (existingIndex === -1) {
      profiles.push(clientProfile);
    } else {
      profiles[existingIndex] = clientProfile;
    }
  });

  res.json({
    success: true,
    message: 'Perfis sincronizados',
    data: profiles
  });
});

export default router;
