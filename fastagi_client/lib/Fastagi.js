const axios = require('axios');
const { httpStatusCodeToException } = require('../Exceptions');
const humps = require('humps')

class Fastagi {
    constructor(baseUrl, apiKey) {
        this.baseUrl = baseUrl;
        this.apiKey = apiKey;
    }

    async createAgent(agentConfig) {
        agentConfig = humps.decamelizeKeys(agentConfig)
        agentConfig.LTM_DB = agentConfig.ltm_db
        delete agentConfig.ltm_db
        try {
            const response = await axios.post(
                `${this.baseUrl}/api/v1/agent`,
                agentConfig,
                { headers: { "X-api-key": this.apiKey } }
            );
            return humps.camelizeKeys(response.data);
        } catch (error) {
            if (error.response) {
                httpStatusCodeToException(error.response.status, error.response.data);
            }
            throw new Error(`${error.response.status.toString()} => ${error.response.data}`);
        }
    }

    async updateAgent(agentId, agentUpdateConfig) {
        agentUpdateConfig = humps.decamelizeKeys(agentUpdateConfig)
        agentUpdateConfig.LTM_DB = agentUpdateConfig.ltm_db
        delete agentUpdateConfig.ltm_db
        try {
            const response = await axios.put(
                `${this.baseUrl}/api/v1/agent/${agentId}`,
                agentUpdateConfig,
                { headers: { "X-api-key": this.apiKey } }
            );
            return humps.camelizeKeys(response.data);
        } catch (error) {
            if (error.response) {
                httpStatusCodeToException(error.response.status, error.response.data);
            }
            throw new Error(`${error.response.status.toString()} => ${error.response.data}`);
        }
    }

    async pauseAgent(agentId, agentRunIds = null) {
        try {
            const response = await axios.post(
                `${this.baseUrl}/api/v1/agent/${agentId}/pause`,
                agentRunIds ? { run_ids: agentRunIds } : {},
                { headers: { "X-api-key": this.apiKey } }
            );
            return humps.camelizeKeys(response.data);
        } catch (error) {
            if (error.response) {
                httpStatusCodeToException(error.response.status, error.response.data);
            }
            throw new Error(`${error.response.status.toString()} => ${error.response.data}`);
        }
    }

    async resumeAgent(agentId, agentRunIds = null) {
        try {
            const response = await axios.post(
                `${this.baseUrl}/api/v1/agent/${agentId}/resume`,
                agentRunIds ? { run_ids: agentRunIds } : {},
                { headers: { "X-api-key": this.apiKey } }
            );
            return humps.camelizeKeys(response.data);
        } catch (error) {
            if (error.response) {
                httpStatusCodeToException(error.response.status, error.response.data);
            }
            throw new Error(`${error.response.status.toString()} => ${error.response.data}`);
        }
    }

    async createAgentRun(agentId, agentRun = null) {
        try {
            const response = await axios.post(
                `${this.baseUrl}/api/v1/agent/${agentId}/run`,
                humps.decamelizeKeys(agentRun) || {},
                { headers: { "X-api-key": this.apiKey } }
            );
            return humps.camelizeKeys(response.data);
        } catch (error) {
            if (error.response) {
                httpStatusCodeToException(error.response.status, error.response.data);
            }
            throw new Error(`${error.response.status.toString()} => ${error.response.data}`);
        }
    }

    async getAgentRunStatus(agentId, agentRunFilter = null) {
        try {
            const response = await axios.post(
                `${this.baseUrl}/api/v1/agent/${agentId}/run-status`,
                humps.decamelizeKeys(agentRunFilter) || {},
                { headers: { "X-api-key": this.apiKey } }
            );
            return humps.camelizeKeys(response.data);
        } catch (error) {
            if (error.response) {
                httpStatusCodeToException(error.response.status, error.response.data);
            }
            throw new Error(`${error.response.status.toString()} => ${error.response.data}`);
        }
    }

    async getAgentRunResources(agentRunIds) {
        try {
            const response = await axios.post(
                `${this.baseUrl}/api/v1/agent/resources/output`,
                { run_ids: agentRunIds },
                { headers: { "X-api-key": this.apiKey } }
            );
            return humps.camelizeKeys(response.data);
        } catch (error) {
            if (error.response) {
                httpStatusCodeToException(error.response.status, error.response.data);
            }
            throw new Error(`${error.response.status.toString()} => ${error.response.data}`);
        }
    }
}

module.exports = Fastagi;