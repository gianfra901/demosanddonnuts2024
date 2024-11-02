# Define the necessary variables
$VAULT_NAMESPACE = "admin"
$VAULT_NAMESPACE_APP = "admin/app1"
$VAULT_ADDR = "https://sample-cluster-public-vault-4bf4a18c.31328491.z1.hashicorp.cloud:8200"
$role_id = "6c45f644-408e-3e05-9d15-ec628ee6da08"
$secret_id = "779da3ac-78a7-fdf7-3ae8-fa6dce8a7a77"

# Create the JSON payload
$payload = @{
    role_id = $role_id
    secret_id = $secret_id
} | ConvertTo-Json

# Make the API request to Vault
$response = Invoke-RestMethod -Uri "$VAULT_ADDR/v1/auth/approle/login" -Method Post -Body $payload -Headers @{
    "X-Vault-Namespace" = $VAULT_NAMESPACE
} -ContentType "application/json"

# Extract the client token from the response
$VAULT_TOKEN = $response.auth.client_token

# Output the token (optional)
Write-Output $VAULT_TOKEN


# Make the API request to Vault
$response = Invoke-RestMethod -Uri "$VAULT_ADDR/v1/admin/app1/kv/data/internal-certificates/demosanddonnuts.online" -Method Get -Headers @{
    "X-Vault-Token" = $VAULT_TOKEN
}

# Extract the data from the response
$data = $response.data

# Output the data
Write-Output $data.data.filevalue
Write-Output $data.data.password
