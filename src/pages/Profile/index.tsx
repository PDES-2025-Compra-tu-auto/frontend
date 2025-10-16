import { useEffect, useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import {
  Email as EmailIcon,
  Person as PersonIcon,
  DeleteForever as DeleteIcon,
  Save as SaveIcon,
} from "@mui/icons-material";

import Avatar from "@/components/common/Avatar";
import { DeleteProfileModal } from "./components/DeleteProfileModal";
import { useForm } from "react-hook-form";

import {
  RootBox,
  MainContainer,
  ProfileSummaryPaper,
  FormPaper,
  DangerZonePaper,
  SectionTitle,
  DangerTitle,
  DangerDescription,
  SubmitButton,
  DeleteButton,
} from "./styles";

import { useCtaQuery } from "@/hooks/useCtaQuery";
import { myUser, updateUser } from "@/services/domain/user";
import { useCtaMutation } from "@/hooks/useCtaMutation";
import { StatusUser, type UpdateUserDto } from "@/services/domain/user/types";
import { useAuth } from "@/context/AuthContext/useAuth";
import { toast } from "react-toastify";
import { Breadcrumbs } from "@/components/common/Breadcrumb";
import { useNavigate } from "react-router-dom";

type FormData = {
  fullname: string;
  email: string;
};

const Profile = () => {
  const { userProfile, logout,updateProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const { data, refetch } = useCtaQuery(() => myUser(userProfile?.id));
  const mutation = useCtaMutation<{ message: string }, UpdateUserDto>((data) =>
    updateUser(data!, userProfile?.id)
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    setValue("fullname", data?.fullname || "");
    setValue("email", data?.email || "");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onSubmit = (formData: FormData) => {
    setIsLoading(true);
    const {email, fullname} = formData
    toast
      .promise(
        () =>
          mutation
            .mutateAsync({
              fullname: fullname,
              email: email,
            })
            .then(() => {
            updateProfile({fullname,email})
              refetch();
            }),
        {
          pending: "Actualizando perfil",
          error: "Hubo un error al actualizar el perfil.",
          success: "¡Perfil actualizado exitosamente!",
        }
      )
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDeleteAccount = () => {
    setOpenDeleteDialog(true);
  };

  const confirmDeleteAccount = () => {
    setOpenDeleteDialog(false);
    mutation.mutate({ status: StatusUser.INACTIVE });
    logout().then(() => (window.location.href = "/"));
  };

  const breadcrumbItems = [
    {
      label: "Inicio",
      onClick: () => navigate("/dashboard"),
    },
    {
      label: "Perfil",
      enabled: true,
    },
  ];

  return (
    <>
      <RootBox>
        <MainContainer maxWidth="md">
          <Breadcrumbs items={breadcrumbItems} />

          <ProfileSummaryPaper elevation={0} sx={{ mt: 3 }}>
            <Avatar
              sx={{ width: 60, height: 60, fontSize: "1.3rem" }}
              name={data?.fullname}
            />
            <div>
              <SectionTitle variant="h5" sx={{ fontWeight: "bold", mb: 0.2 }}>
                {data?.fullname}
              </SectionTitle>
              <SectionTitle variant="body2" sx={{ color: "text.secondary" }}>
                {data?.email}
              </SectionTitle>
            </div>
          </ProfileSummaryPaper>

          <FormPaper elevation={0}>
            <SectionTitle variant="h6">Información Personal</SectionTitle>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div style={{ marginBottom: 24 }}>
                <TextField
                  fullWidth
                  label="Nombre Completo"
                  disabled={isLoading}
                  error={!!errors.fullname}
                  helperText={errors.fullname?.message}
                  {...register("fullname", {
                    required: "Este campo es obligatorio",
                  })}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon sx={{ color: "text.secondary" }} />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </div>

              <div style={{ marginBottom: 24 }}>
                <TextField
                  fullWidth
                  label="Correo Electrónico"
                  type="email"
                  disabled={isLoading}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  {...register("email", {
                    required: "Este campo es obligatorio",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Por favor ingresa un correo electrónico válido",
                    },
                  })}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon sx={{ color: "text.secondary" }} />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </div>
              <SubmitButton
                type="submit"
                variant="contained"
                disabled={isLoading}
                startIcon={<SaveIcon />}
              >
                {isLoading ? "Guardando..." : "Guardar Cambios"}
              </SubmitButton>
            </form>
          </FormPaper>

          <DangerZonePaper elevation={0}>
            <DangerTitle variant="h6">Zona de Peligro</DangerTitle>
            <DangerDescription variant="body2">
              Una vez que elimines tu cuenta, no hay vuelta atrás. Por favor,
              está seguro.
            </DangerDescription>
            <DeleteButton
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleDeleteAccount}
            >
              Eliminar Cuenta Permanentemente
            </DeleteButton>
          </DangerZonePaper>
        </MainContainer>
      </RootBox>

      <DeleteProfileModal
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        primaryAction={confirmDeleteAccount}
      />
    </>
  );
};

export default Profile;
