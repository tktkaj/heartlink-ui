import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { getAuthAxios } from "../api/authAxios";
import { getNewRefreshToken } from "../api/refresh";

export default function CoupleAlert() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleCancel = () => {
    setOpen(false);
    window.history.back();
  };
  const handleBroken = async () => {
    try {
      const access = localStorage.getItem("access");
      const authAxios = getAuthAxios(access);
      const res = await authAxios.put("/couple/unlink");

      // 커플 해지 후 새로운 토큰 받아오기
      const { accessToken, refreshToken } = await getNewRefreshToken();

      localStorage.setItem("access", accessToken);
      localStorage.setItem("refresh", refreshToken);

      // 새로운 토큰을 바로 사용하도록 상태 업데이트
      authAxios.defaults.headers["Authorization"] = `Bearer ${accessToken}`;

      console.log("커플 해지 성공", res);
      alert("커플 해지가 완료되었습니다.");
      setOpen(false);
      navigate("/home");
    } catch (error) {
      console.error("커플 해지 실패:", error);
      alert("커플 해지에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <ExclamationTriangleIcon
                    aria-hidden="true"
                    className="h-6 w-6 text-red-600"
                  />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900"
                  >
                    커플 해지
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      커플을 해지하시게 되면 90일 동안 데이터가 유지되며 그
                      이후로는 데이터를 복구할 수 없습니다. 해지하시겠습니까?
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={handleBroken}
                className="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-s sm:ml-3 sm:w-auto"
                style={{ backgroundColor: "#706EF4" }}
              >
                해지
              </button>
              <button
                type="button"
                data-autofocus
                onClick={handleCancel}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                취소
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
