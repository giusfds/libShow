package com.example.libshow.service;

import com.example.libshow.domain.Emprestimo;
import com.example.libshow.domain.Reserva;
import com.example.libshow.repository.EmprestimoRepository;
import com.example.libshow.repository.ReservaRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RelatorioService {

    private static final Logger logger = LoggerFactory.getLogger(RelatorioService.class);

    @Autowired
    private EmprestimoRepository emprestimoRepository;
    @Autowired
    private ReservaRepository reservaRepository;

    public List<Emprestimo> getEmprestimosAtivos() {
        logger.info("[RelatorioService] Processando relatório de empréstimos ativos");
        try {
            List<Emprestimo> emprestimos = emprestimoRepository.findAll();
            logger.debug("[RelatorioService] Total de empréstimos no banco: {}", emprestimos.size());

            List<Emprestimo> emprestimosAtivos = emprestimos.stream()
                    .filter(e -> e.getDataDevolucaoReal() == null)
                    .collect(Collectors.toList());

            logger.info("[RelatorioService] Empréstimos ativos encontrados: {}", emprestimosAtivos.size());
            return emprestimosAtivos;
        } catch (Exception e) {
            logger.error("[RelatorioService] Erro ao processar relatório de empréstimos ativos", e);
            throw e;
        }
    }

    public List<Reserva> getReservasAtivas() {
        logger.info("[RelatorioService] Processando relatório de reservas ativas");
        try {
            List<Reserva> reservas = reservaRepository.findAll();
            logger.debug("[RelatorioService] Total de reservas no banco: {}", reservas.size());

            List<Reserva> reservasAtivas = reservas.stream()
                    .filter(r -> "ATIVA".equals(r.getStatus()))
                    .collect(Collectors.toList());

            logger.info("[RelatorioService] Reservas ativas encontradas: {}", reservasAtivas.size());
            return reservasAtivas;
        } catch (Exception e) {
            logger.error("[RelatorioService] Erro ao processar relatório de reservas ativas", e);
            throw e;
        }
    }

    // Add more reporting methods as needed
}
