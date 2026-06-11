#!/bin/bash
#
# Gera o keystore de RELEASE do Voz Mágica
#
# ⚠️ IMPORTANTE:
# - Guarde o arquivo .keystore e as senhas em local SEGURO (cofre de senhas)
# - Se perder o keystore, NÃO será possível atualizar o app na Play Store!
# - NUNCA commite o keystore nem as senhas no Git
#
# Uso: ./scripts/generate-release-keystore.sh

set -e

KEYSTORE_DIR="android/app"
KEYSTORE_FILE="voz-magica-release.keystore"
KEY_ALIAS="voz-magica"

if [ -f "$KEYSTORE_DIR/$KEYSTORE_FILE" ]; then
  echo "❌ Keystore já existe em $KEYSTORE_DIR/$KEYSTORE_FILE"
  echo "   Se quiser gerar outro, remova o arquivo primeiro (CUIDADO!)."
  exit 1
fi

echo "🔐 Gerando keystore de release do Voz Mágica..."
echo ""
echo "Você vai definir uma senha. ANOTE-A EM LOCAL SEGURO!"
echo ""

keytool -genkeypair -v \
  -storetype PKCS12 \
  -keystore "$KEYSTORE_DIR/$KEYSTORE_FILE" \
  -alias "$KEY_ALIAS" \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000

echo ""
echo "✅ Keystore criado em: $KEYSTORE_DIR/$KEYSTORE_FILE"
echo ""
echo "📝 Agora adicione ao arquivo android/gradle.properties"
echo "   (ou melhor: ~/.gradle/gradle.properties para não commitar):"
echo ""
echo "VOZMAGICA_RELEASE_STORE_FILE=$KEYSTORE_FILE"
echo "VOZMAGICA_RELEASE_KEY_ALIAS=$KEY_ALIAS"
echo "VOZMAGICA_RELEASE_STORE_PASSWORD=sua_senha_aqui"
echo "VOZMAGICA_RELEASE_KEY_PASSWORD=sua_senha_aqui"
echo ""
echo "Depois gere o AAB para a Play Store com:"
echo "  npm run android:bundle"
