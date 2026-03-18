-- Inserindo 10 Pacientes
INSERT INTO tb_patient (name) VALUES ('Ana Silva');
INSERT INTO tb_patient (name) VALUES ('Bruno Costa');
INSERT INTO tb_patient (name) VALUES ('Carla Souza');
INSERT INTO tb_patient (name) VALUES ('Diego Lima');
INSERT INTO tb_patient (name) VALUES ('Elena Pires');
INSERT INTO tb_patient (name) VALUES ('Fabio Junior');
INSERT INTO tb_patient (name) VALUES ('Gisele Rocha');
INSERT INTO tb_patient (name) VALUES ('Hugo Mendes');
INSERT INTO tb_patient (name) VALUES ('Iara Nunes');
INSERT INTO tb_patient (name) VALUES ('João Diniz');

-- Inserindo 5 Profissionais
INSERT INTO tb_professional (name, speciality) VALUES ('Dr. Arnaldo', 'Cardiologia');
INSERT INTO tb_professional (name, speciality) VALUES ('Dra. Beatriz', 'Dermatologia');
INSERT INTO tb_professional (name, speciality) VALUES ('Dr. Carlos', 'Ortopedia');
INSERT INTO tb_professional (name, speciality) VALUES ('Dra. Daniela', 'Pediatria');
INSERT INTO tb_professional (name, speciality) VALUES ('Dr. Eduardo', 'Clínico Geral');

-- Inserindo 20 Atendimentos (Scheduling)
-- Formato do Instant/Timestamp: 'YYYY-MM-DDTHH:MM:SSZ'
INSERT INTO tb_scheduling (moment_scheduling, patient_id, professional_id) VALUES ('2024-05-20T08:00:00Z', 1, 1);
INSERT INTO tb_scheduling (moment_scheduling, patient_id, professional_id) VALUES ('2024-05-20T09:00:00Z', 2, 1);
INSERT INTO tb_scheduling (moment_scheduling, patient_id, professional_id) VALUES ('2024-05-20T10:00:00Z', 3, 2);
INSERT INTO tb_scheduling (moment_scheduling, patient_id, professional_id) VALUES ('2024-05-20T11:00:00Z', 4, 2);
INSERT INTO tb_scheduling (moment_scheduling, patient_id, professional_id) VALUES ('2024-05-21T08:30:00Z', 5, 3);
INSERT INTO tb_scheduling (moment_scheduling, patient_id, professional_id) VALUES ('2024-05-21T09:30:00Z', 6, 3);
INSERT INTO tb_scheduling (moment_scheduling, patient_id, professional_id) VALUES ('2024-05-21T14:00:00Z', 7, 4);
INSERT INTO tb_scheduling (moment_scheduling, patient_id, professional_id) VALUES ('2024-05-21T15:00:00Z', 8, 4);
INSERT INTO tb_scheduling (moment_scheduling, patient_id, professional_id) VALUES ('2024-05-22T08:00:00Z', 9, 5);
INSERT INTO tb_scheduling (moment_scheduling, patient_id, professional_id) VALUES ('2024-05-22T09:00:00Z', 10, 5);
INSERT INTO tb_scheduling (moment_scheduling, patient_id, professional_id) VALUES ('2024-05-22T10:00:00Z', 1, 3);
INSERT INTO tb_scheduling (moment_scheduling, patient_id, professional_id) VALUES ('2024-05-22T11:00:00Z', 2, 4);
INSERT INTO tb_scheduling (moment_scheduling, patient_id, professional_id) VALUES ('2024-05-23T14:00:00Z', 3, 5);
INSERT INTO tb_scheduling (moment_scheduling, patient_id, professional_id) VALUES ('2024-05-23T15:00:00Z', 4, 1);
INSERT INTO tb_scheduling (moment_scheduling, patient_id, professional_id) VALUES ('2024-05-23T16:00:00Z', 5, 2);
INSERT INTO tb_scheduling (moment_scheduling, patient_id, professional_id) VALUES ('2024-05-24T08:00:00Z', 6, 1);
INSERT INTO tb_scheduling (moment_scheduling, patient_id, professional_id) VALUES ('2024-05-24T09:00:00Z', 7, 2);
INSERT INTO tb_scheduling (moment_scheduling, patient_id, professional_id) VALUES ('2024-05-24T10:00:00Z', 8, 3);
INSERT INTO tb_scheduling (moment_scheduling, patient_id, professional_id) VALUES ('2024-05-24T11:00:00Z', 9, 4);
INSERT INTO tb_scheduling (moment_scheduling, patient_id, professional_id) VALUES ('2024-05-24T12:00:00Z', 10, 5);
